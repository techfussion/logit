import { Injectable, InternalServerErrorException, ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import * as argon from 'argon2';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { ConfigService } from "@nestjs/config";

@Injectable () 
export class AuthService {
    constructor (private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
    
        //  Find user by email
        const user = await this.prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            role: true,
            schoolSupervisorProfile: true,
            industrySupervisorProfile: true,
            studentProfile: true,
          }
        });
    
        if (!user) {
          throw new NotFoundException('Invalid email or password');
        }
    
        // Validate password
        const isPasswordValid = await argon.verify(user.password, password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        // Generate JWT Token
        const payload = {
          sub: user.id,
          email: user.email,
          role: user.role,
        };
    
        const token = this.jwt.sign(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRATION_TIME')
        });
    
        // Return token and user info
        return {
          message: 'Login successful',
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            profile: user.studentProfile || user.industrySupervisorProfile || user.schoolSupervisorProfile,
          },
          token,
        };
      }

    async register(registerDto: RegisterDto) {
        const { 
          firstName,
          middleName,
          lastName,
          email, 
          password, 
          role, 
          matricNo, 
          companyName, 
          position, 
          faculty, 
          schoolPosition 
        } = registerDto;
        
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({ 
          where: { email },
          select: { id: true } 
        });
        
        if (existingUser) {
          throw new ConflictException('Email is already registered');
        }
      
        // Hash the password
        const hashedPassword = await argon.hash(password);
      
        try {
          // Prisma transaction to ensure atomic operations
          return await this.prisma.$transaction(async (prisma) => {
            // Create user
            const user = await prisma.user.create({
              data: {
                email,
                password: hashedPassword,
                role,
              },
              select: {
                id: true,
                email: true,
                role: true,
              }
            });
      
            // Create profile based on role
            let profileData;
            switch (role) {
              case Role.STUDENT:
                profileData = await prisma.student.create({
                  data: {
                    firstName,
                    middleName,
                    lastName,
                    matricNo,
                    userId: user.id,
                  },
                  select: { 
                    id: true,
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    matricNo: true,
                  }
                });
                break;
              
              case Role.INDUSTRY_SUPERVISOR:
                profileData = await prisma.industrySupervisor.create({
                  data: {
                    firstName,
                    middleName,
                    lastName,
                    companyName,
                    position,
                    userId: user.id,
                  },
                  select: { 
                    id: true,
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    companyName: true,
                    position: true,
                  }
                });
                break;
              
              case Role.SCHOOL_SUPERVISOR:
                profileData = await prisma.schoolSupervisor.create({
                  data: {
                    firstName,
                    middleName,
                    lastName,
                    faculty,
                    position: schoolPosition,
                    userId: user.id,
                  },
                  select: { 
                    id: true,
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    faculty: true,
                    position: true,
                  }
                });
                break;
            }
      
            // Generate JWT Token
            const payload = {
              sub: user.id,
              email: user.email,
              role: user.role,
            };
        
            const token = this.jwt.sign(payload, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: this.config.get('JWT_EXPIRATION_TIME')
            });

            return {
              message: 'User registered successfully',
              user: {
                ...user,
                profile: profileData,
                createdAt: new Date(),
              },
              token,
            };
          }, {
            maxWait: 5000,  // Maximum wait time for transaction
            timeout: 10000  // Overall timeout
          });
        } catch (error) {
          // Handle specific Prisma errors
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Unique constraint violation
            if (error.code === 'P2002') {
              throw new ConflictException('A unique constraint was violated during registration');
            }
          }
      
          // Rethrow or throw a generic error
          throw new InternalServerErrorException('Registration failed');
        }
      }
}