import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User";
import { Comment } from "./Comment";

import { Field, ObjectType } from "type-graphql";

@ObjectType({description: "The news model"})
@Entity()
export class News extends BaseEntity {
    
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field({description: "The title of the news"})
    @Column()
    title: string;

    @Field({description: "The subtitle of the news"})
    @Column()
    subtitle: string;

    @Field()
    @Column()
    image?: string;

    @Field({description: "The content of the news"})
    @Column()
    text: string;

    @Field(() => User)
    @OneToOne(() => User)
    createdBy: User;
    
    @Field(() => String)
    @Column()
    createdAt: Date;

    @Field(() => String)
    @Column()
    updatedAt: Date;

    @OneToMany(() => Comment, (comment) => comment.news)
    comments: Comment[];
} 
