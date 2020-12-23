
import { User } from "../entities/User";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType() 
class FieldError {
    @Field()
    field: string;

    @Field() 
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError] , { nullable : true })
    errors?: FieldError[];

    @Field(() => User, { nullable : true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @Query(() => UserResponse) 
    async findUser(
        @Arg("id") id: number
    ) : Promise<UserResponse> {
        
        // retrieving user ... 
        const user = await User.findOne(id);

        return {
            user: user
        }
    }

    @Mutation(() => UserResponse)
    async registerUser(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<UserResponse> {
        // check if the username doesn't exist already ...
        const existentUser = await User.findOne({ username: username });

        if(existentUser != null && existentUser != undefined) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username already exists"
                    }
                ]
            }
        }
        
        // check username length ...
        if(password.length <= 5) {
            return {
                errors: [
                    {
                        field: "password", 
                        message: "length must be greater than 5"
                    }
                ]
            }
        }

        const user = new User();
        user.username = username;
        user.password = password;
        user.createdAt = new Date();
        user.updateAt = new Date();

        const createdUser = await user.save();

        return {
            user: createdUser
        }
    }

    @Mutation(() => UserResponse)
    async loginUser(
        @Arg("username") username: string, 
        @Arg("password") password: string
    ) : Promise<UserResponse> {
        
        // check if user exists ... 
        const foundUser = await User.findOne({ username: username });

        if(foundUser != null && foundUser != undefined) {
            const foundUserPassword = foundUser.password;

            if(password === foundUserPassword) {
                return {
                    user: foundUser
                }
            } 

            return {
                errors: [
                    {
                        field: "password", 
                        message: "invalid credentials"
                    }
                ]
            }
        } 

        return {
            errors: [
                {
                    field: "username", 
                    message: "invalid username"
                }
            ]
        }
    }
}