import {Request,Response} from 'express'
import {userRepository} from '../repositories/userRepository'
import { BadRequestError, UnauthorizedError } from '../helpers/api-erros';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController
{
    async create(req:Request,res:Response)
    {
        const {name,email,password} = req.body;
        const userExists = await userRepository.findOneBy({email})

        if(userExists){
            throw new BadRequestError('E-mail já existe')
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = userRepository.create({
            name,
            email,
            password:hashPassword
        })

        await userRepository.save(newUser);

        const {password:_,...user} = newUser

        return res.status(201).json(newUser);
    }

    async login(req:Request,res:Response){
        const {email,password} = req.body;

        const user = await userRepository.findOneBy({email})

        if(!user){
            throw new BadRequestError('E-mail ou senha invalida')
        }

        const verifyPass = await bcrypt.compare(password,user.password)
        
        if(!verifyPass){
            throw new BadRequestError('E-mail ou senha invalida')
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '',{expiresIn:'8h'})
        
        const {password:_,...userLogin}= user

        return res.json({
            user:userLogin,
            token:token
        })
    }

    async getProfile(req:Request,res:Response)
    {
        const {authorization} = req.headers
        if(!authorization){
            throw new UnauthorizedError('not autorization')
        }

        console.log(authorization)
    }
}

export {UserController};