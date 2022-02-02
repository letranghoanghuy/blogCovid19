import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import Category from '../models/category.model';
import { Information } from '../models/information.model';
import { Post } from '../models/post.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private dbPathCategory = '/categories';
  categoriesRef: AngularFireList<Category>;

  private dbPost = '/posts';
  postsRef: AngularFireList<Post>
  postRef:  AngularFireObject<Post>

  private dbVideo = '/videos';
  videosRef: AngularFireList<Video>
  videoRef: AngularFireObject<Video>

  private dbInformation = '/informations';
  informationsRef: AngularFireList<Information>

  private dbCode = '/admin';
  codeRef: AngularFireList<any>;


  constructor(private firebase: AngularFireDatabase) {
    this.categoriesRef = firebase.list(this.dbPathCategory);

    this.postsRef = firebase.list(this.dbPost);

    this.videosRef= firebase.list(this.dbVideo);

    this.informationsRef= firebase.list(this.dbInformation);

    this.codeRef= firebase.list(this.dbCode);
  }

  /**************Category***************** */
  public getCategories(): AngularFireList<Category>{
    return this.categoriesRef;
  }

  public createCategory(category: Category):any{
    return this.categoriesRef.push(category);
  }
  
  public updateCategory(key: string, value: any): Promise<void>{
    return this.categoriesRef.update(key, value);
  }

  public deleteCategory(key: string): Promise<void>{
    return this.categoriesRef.remove(key);
  }

  /**************Post**************************** */
  public getPosts(): AngularFireList<Post>{
    return this.postsRef;
  }

  public getPost(key: string){
    this.postRef=this.firebase.object(this.dbPost+'/'+key);
    return this.postRef;
  }

  public createPost(post: Post): any {
    return this.postsRef.push(post);
  }

  public updatePost(key: string, value: any): Promise<void> {
    return this.postsRef.update(key, value);
  }

  public deletePost(key: string): Promise<void> {
    return this.postsRef.remove(key);
  }

  /**************Video**************************** */
  public getVideos(): AngularFireList<Video>{
    return this.videosRef;
  }

  public getVideo(key: string){
    this.videoRef=this.firebase.object(this.dbVideo+'/'+key);
    return this.videoRef;
  }

  public createVideo(video: Video): any {
    return this.videosRef.push(video);
  }

  public updateVideo(key: string, value: any): Promise<void> {
    return this.videosRef.update(key, value);
  }

  public deleteVideo(key: string): Promise<void> {
    return this.videosRef.remove(key);
  }

  /**************Information**************************** */
  public getInformations(): AngularFireList<Information> {
    return this.informationsRef;
  }

  public createInformation(information: Information): any {
    return this.informationsRef.push(information);
  }

  public updateInformation(key: string, value: any): Promise<void> {
    return this.informationsRef.update(key, value);
  }

  public deleteInformation(key: string): Promise<void> {
    return this.informationsRef.remove(key);
  }

  /**************/
  public getCode(): AngularFireList<any>{
    return this.codeRef
  }

}
