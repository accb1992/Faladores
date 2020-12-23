import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";

import { Comment } from './Comment';

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    username!: string;

    @Column()
    password!: string;

    @Field({nullable: true})
    @Column({nullable : true})
    photo: string;
    
    @Field({nullable: true})
    @Column({nullable: true})
    description: string;

    @Field(() => String)
    @Column()
    createdAt: Date;

    @Field(() => String)
    @Column()
    updateAt: Date;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}