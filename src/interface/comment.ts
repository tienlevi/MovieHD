interface CommentInterface {
  id?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  comment?: string;
  parentCommentId?: string;
  create_at?: any;
  update_at?: any;
}

export default CommentInterface;
