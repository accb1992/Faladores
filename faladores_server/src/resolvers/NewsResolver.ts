
import { News } from "../entities/News";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(News)
export class NewsResolver {
    @Query(() => [News])    
    async news(
        @Arg("take") take: number,
        @Arg("skip") skip: number
    ) : Promise<News[]> {
        return await News.find({take: take, skip: skip});
    }

    @Mutation(() => News)
    async createNews(
        @Arg("title") title: string,
        @Arg("subtitle") subtitle: string, 
        @Arg("text") text : string,
        @Arg("image") image: string
    ): Promise<News> {

        const news = new News();

        news.title = title;
        news.subtitle = subtitle;
        news.text = text;
        news.createdAt = new Date();
        news.updatedAt = new Date();
        news.image = image;

        return await news.save();
    }
}