import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';
import {ProfileService} from '../../services/profile.service';
import {Like, LikeService} from '../../services/like.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-flat-comment',
  templateUrl: './flat-comment.component.html',
  styleUrls: ['./flat-comment.component.scss']
})
export class FlatCommentComponent implements OnInit {
  isId: any = this.authService.isAuthenticated() ? this.profileService.getUserId().subscribe((id) => this.isId = id) : 0;
  comments: FlatComment[] = [];
  commentId: number;
  isTrue = false;
  isList = false;
  isComplain = false;
  text = '';
  @Input() id: number;
  load = 'new';

  constructor(private flatCommentService: FlatCommentService,
              private profileService: ProfileService,
              private likeService: LikeService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  // getUserId() {
  //   if (this.authService.isAuthenticated()) {
  //     return this.profileService.getUserId().subscribe((id) => this.isId = id);
  //   }
  //   return 0;
  // }

  loadData() {
    if (this.load === 'new') {
      this.loadComments(this.id);
    }
    if (this.load === 'old') {
      this.loadCommentsOlder(this.id);
    }
    if (this.load === 'like') {
      this.loadCommentsByLikes(this.id);
    }
  }

  loadCommentsOlder(id: number): void {
    this.flatCommentService.loadComments(id)
      .subscribe(comments => {
        this.comments = comments;
      });
    console.log(this.comments);
  }

  loadCommentsByLikes(id: number): void {
    this.flatCommentService.loadCommentsByLikes(id)
      .subscribe(comments => {
        this.comments = comments;
      });
    console.log(this.comments);
  }

  loadComments(id: number): void {
    this.flatCommentService.loadComments(id)
      .subscribe(comments => {
        this.comments = comments.reverse();
      });
    console.log(this.comments);
  }


  remove(id: number) {
    this.flatCommentService.remove(id)
      .subscribe(() => {
        this.comments = this.comments.filter(item => item.id !== id);
      });
  }

  add() {
    if (!this.text.trim()) {
      return;
    }
    const newFlatComment: FlatComment = {
      text: this.text,
      flatId: this.id
    };

    this.flatCommentService.add(newFlatComment)
      .subscribe(flatComment => {
        this.text = '';
        this.loadData();
      });
  }


  addFlat(id: number) {
    const like: Like = {
      flatCommentId: id
    };
    this.likeService.addFlat(like)
      .subscribe(flatComment => {
        this.loadData();
      });
  }

  getUserRole() {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      return 'UNDERFINED';
    } else {
      return JSON.parse(localStorage.getItem('user')).role;
    }
  }
}


