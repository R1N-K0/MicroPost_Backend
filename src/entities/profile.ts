import {
        Entity,
        Column,
        PrimaryGeneratedColumn,
        CreateDateColumn,
        UpdateDateColumn,
        OneToOne,
        JoinColumn
} from 'typeorm'

import { User } from './user.entity';


@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column("varchar", {comment: "自己紹介", nullable: true})
    description: string

    @Column({nullable: true})
    img: string

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({})
    user: User
}