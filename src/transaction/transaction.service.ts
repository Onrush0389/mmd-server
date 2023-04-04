import { Injectable, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma.service';

// import { GetUserDto } from 'src/user/dto/get-user.dto';
import { CreateTransactionDto } from './dto/createTransactionDto.dto';
// import * as abi from './MyNFT.json';
import { UserService } from '../user/user.service';
// import { GetTokenDto } from './dto/get-token.dto';
    

@Injectable()
export class TransactionService {
    constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    ) {}

    contractAddress = '0xDC7eCe116e7b178f31cC02208A51481a993862Fe';
    url = 'https://rpc.debugchain.net';
    pk = process.env.PK!;


    async createTransaction(newtransaction: CreateTransactionDto): Promise<any> {
    //judge if the NFT is already in the database
    const transactionPush = await this.getToken(newtoken.hash);
    if (transactionPush) {
        throw new NotFoundException('This NFT already exists.');
    } else {
        const provider = new ethers.providers.JsonRpcProvider(this.url);
        const wallet = new ethers.Wallet(this.pk, provider);
        const contract = new ethers.Contract(
        this.contractAddress,
        abi.abi,
        wallet,
        );

        const owner = await this.userService.getUser(newtransaction.NFT);
        const address = owner.walletAddress;

        const tx = await contract.awardToken(address, newtransaction.NFT);
        const receipt = await tx.wait();

        const tokenId = parseInt(receipt.events[0].args[2]);
        console.log('tokenId', tokenId);

        return this.prisma.transaction.create({
            data: newtransaction,
        });
    }
    }
}
    


