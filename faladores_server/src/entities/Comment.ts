import { Field } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
    
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn()
    user!: User

    @OneToOne(() => News)
    @JoinColumn()
    news!: News;
    
    @Field()
    @Column()
    content: string;

    @Field()
    @Column()
    likes: number;

    @Field()
    @Column()
    dislikes: number;

    @Field()
    @Column()
    createAt: Date;

    @Field()
    @Column()
    updatedAt: Date;
}