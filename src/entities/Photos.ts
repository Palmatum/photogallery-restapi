import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from './User'

@Entity('photos')
export default class Photos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'bytea'
    })
    photo: Buffer;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    created_at: Date;
    
    @ManyToOne(type => User, user => user.photos)
    user: User;
}