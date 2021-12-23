import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Photos from './Photos';

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(type => Photos, photo => photo.user)
    photos: Photos[];

}