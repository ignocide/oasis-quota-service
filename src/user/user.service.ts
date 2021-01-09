import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entitiy';
import { UserRepository } from '../repository/user.repository';
import * as firebase from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  expiresIn = 60 * 60 * 24 * 5 * 1000;
  sessionCookieName = 'accessToken';
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    this.initializeFirebase();
  }

  initializeFirebase() {
    firebase.initializeApp({
      credential: firebase.credential.cert(this.configService.get('firebase')),
    });
  }

  async signUpIfNotExist(uid: string): Promise<User> {
    const user = await this.readByFirebaseUid(uid);

    if (user) {
      return user;
    }
    const createdUser = this.userRepository.save({
      firebaseUid: uid,
    });
    return createdUser;
  }

  async readByFirebaseUid(firebaseUid: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      firebaseUid,
    });

    return user || null;
  }

  async authFirebase(token: string) {
    return await firebase.auth().verifyIdToken(token);
  }

  async createSessionCookie(idToken: string): Promise<string> {
    return firebase
      .auth()
      .createSessionCookie(idToken, { expiresIn: this.expiresIn });
  }

  async getUidBySessionCookie(sessionCookie: string) {
    try {
      const { uid } = await firebase
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */);

      return uid;
    } catch (e) {
      return null;
    }
  }
}
