import express, { Application, Request, Response, NextFunction, Router } from 'express';
import { getConnection } from "typeorm";
import User from "../entities/User";
import Photos from '../entities/Photos'
import multer from 'multer';
import fs from 'fs';
const upload = multer();

const router: Router = express.Router();

router.post('/user', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userO: any = req.body;
        const user = new User();
        Object.assign(user, userO);

        const connection: any = await getConnection();
        const result: any = await connection.manager.save(user);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//get all users
router.get('/user', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const result: any = await connection.manager.find(User);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//find one user
router.get('/user/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const result: any = await connection.manager.findOne(User, req.params.id);
        res.send(result);
    } catch (error) {
        console.log('err');
    }
});

//delete one user
router.delete('/user/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const result: any = await connection.manager.delete(User, req.params.id);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//update one user
router.put('/user/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const result: any = await connection.manager.update(User, req.params.id, req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//upload a photo
router.post('/user/:id/photo', upload.single('photo'), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const user: any = await connection.manager.findOne(User, req.params.id);
        const photo = new Photos();
        photo.created_at = new Date();
        photo.name = req.body.name;
        photo.description = req.body.description;
        const photoBuffer = (req.file!).buffer;
        photo.photo = photoBuffer;
        photo.user = user;

        const result: any = await connection.manager.save(photo);
        res.send(result);
    } catch (error) {
        console.log('err');
    }
});

//get all photos of user
router.get('/user/:id/photo', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const user: any = await connection.manager.findOne(User, req.params.id);
        const result: any = await connection.manager.find(Photos, {
            where: {
                user: user
            }
        });

        //convert all the buffers to base64


        res.send(() => {
            result.map((photo: any) => {
                const b64 = Buffer.from(photo.photo).toString('base64');
                const mime = 'image/jpeg';
                res.send(`<img src="data:${mime};base64,${b64}" />`);
            });
        })

        
    } catch (error) {
        console.log(error);
    }
});


//get one photo of one user
router.get('/user/:id/photos/:photoId', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const connection: any = await getConnection();
        const result: any = await connection.manager.findOne(Photos, req.params.photoId);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});





export default router;

