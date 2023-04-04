import { Injectable, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma.service';;
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

      async insertUser(user: CreateUserDto): Promise<CreateUserDto> {
        //find the user whether it is already exist or not if exsit stop the process
    
        const findUserurl = await this.getUser(user.minerUsername);
        
        if (findUserurl) { 
          throw new NotFoundException('Miner already exists in MMD Community!');
        } else {
          //create a random wallet
          const wallet = ethers.Wallet.createRandom();
          user.mmdWalletAddress = wallet.address;
          user.privateKey = wallet.privateKey;
          
          return this.prisma.user.create({
            data: user,
          });
        }
      }

      async getUser(minerUsername: string): Promise<GetUserDto> {
        try {
          const user = await this.prisma.user.findUnique({
            where: {
              minerUsername: minerUsername,
            },
          });
          return user;
        } catch (error) {
          throw new NotFoundException('Could not find user.');
        }
      }

}
