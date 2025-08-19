import {
        Entity,
        Column,
        PrimaryGeneratedColumn,
        CreateDateColumn,
        UpdateDateColumn,
        OneToOne
} from 'typeorm'
import { Profile } from './profile';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    readonly id:number;

    @Column("varchar")
    name: string;
    
    @Column("varchar")
    hash: string;

    @Column("varchar")
    email: string;

    @OneToOne(() => Profile, (profile) => profile.user, {eager: true})
    profile: Profile

    @CreateDateColumn()
    readonly created_at?: Date;

    @UpdateDateColumn()
    readonly updated_at?: Date;
}