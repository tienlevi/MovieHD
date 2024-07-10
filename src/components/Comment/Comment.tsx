import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReplyIcon from "@mui/icons-material/Reply";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useAuth from "../../hooks/useAuth";
import Section from "../Section/Section";
import ReplyComment from "./ReplyComment";
import CommentInterface from "../../interface/comment";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../../config/action";
import "./style.scss";
import User from "../../interface/user";

interface Props {
  uid: string;
  id: string;
  type: string;
}

interface Inputs {
  id: string;
  comment: string;
  commentConfirm: string;
}

function Comment({ uid, id, type }: Props) {
  // Add Comment
  const formAdd = useForm();
  // Edit Comment
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState<CommentInterface[]>([]);
  const [select, setSelect] = useState<string | null>(null);
  const [reply, setReply] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response: any = await getComments(id as any);
      setListComment(response);
    };
    getData();
  }, [loading]);

  const handleAdd = async (data: any) => {
    const response = await addComment(
      id,
      user?.uid,
      user?.displayName,
      user?.photoURL,
      type,
      data.comment
    );
    const add = {
      id: response?.id,
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      comment: data.comment,
      create_at: new Date().toLocaleString(),
    };
    setLoading(true);
    setListComment((prevList): any => {
      return [...prevList, add];
    });
    toast.success("Add success");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are sure want to delete ?")) {
      await deleteComment(id);
      const deleteItem = listComment.filter((item: User) => item.id !== id);
      setListComment(deleteItem);
      toast.error("Delete success");
    }
  };

  const handleEdit = async (data: any) => {
    const result = listComment.find((item) => item.id === select);
    const newComment = { ...result, comment: data.commentConfirm };
    const editItem = listComment.map((item: any) =>
      item.id === data.id ? newComment : item
    );
    await editComment(newComment);
    setSelect(null);
    toast.success("Edit success");
    setListComment(editItem);
  };

  const selectReply = (id: any) => {
    const selectReply = listComment.find(
      (item: CommentInterface) => item.id === id
    );
    setReply(selectReply?.id as any);
  };

  return (
    <Section className="">
      <div className="comment-title">
        <h1>Comment</h1>
      </div>
      <form
        onSubmit={formAdd.handleSubmit(handleAdd)}
        className="comment-input"
      >
        <textarea
          {...formAdd.register("comment", { required: "Validate" })}
        ></textarea>
        {formAdd.formState.errors?.comment && (
          <p style={{ color: "red" }}>
            {String(formAdd.formState.errors.comment.message)}
          </p>
        )}
        {user && (
          <button className="comment-item-btn-add" style={{ border: "none" }}>
            Add
          </button>
        )}
      </form>
      <div className="list-comment">
        {listComment.map((item: CommentInterface, index: number) =>
          select === item.id ? (
            <form
              key={index}
              onSubmit={handleSubmit(handleEdit)}
              className="comment-input"
            >
              <textarea
                {...register("commentConfirm", { required: true })}
              ></textarea>
              {errors?.commentConfirm?.type === "required" && (
                <p style={{ color: "red " }}>Validate</p>
              )}
              <div key={index} className="comment-item-btn-select">
                <div
                  className="comment-item-btn-cancel"
                  onClick={() => setSelect(null)}
                >
                  Cancel
                </div>
                <button
                  className="comment-item-btn-confirm"
                  style={{ border: "none" }}
                >
                  Confirm
                </button>
              </div>
            </form>
          ) : (
            <div key={index}>
              {item.parentCommentId === undefined && item.type === type && (
                <div className="comment-item">
                  <div className="comment-item-user">
                    <div className="comment-item-img">
                      <img src={item.photoURL} alt="" />
                    </div>
                    <div className="content-item-name-date">
                      <div className="comment-item-name">
                        <h2>{item.displayName}</h2>
                      </div>
                      <div className="comment-item-date">
                        <AccessTimeIcon />
                        <p>
                          {item.update_at
                            ? `Edit at ${item.update_at}`
                            : item.create_at}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="comment-item-content">
                    <p>{item.comment}</p>
                  </div>
                  <div key={index} className="comment-item-action">
                    <div
                      onClick={() => selectReply(item.id)}
                      className="comment-item-reply"
                    >
                      <ReplyIcon style={{ fontSize: 20 }} />
                      <p>Reply</p>
                    </div>
                    {uid === item.uid && (
                      <div className="comment-item-btn">
                        <div
                          className="comment-item-btn-delete"
                          onClick={() => handleDelete(item?.id!)}
                        >
                          Delete
                        </div>
                        <div
                          className="comment-item-btn-edit"
                          onClick={() => {
                            reset({
                              id: item.id,
                              commentConfirm: item.comment,
                            });
                            setSelect(item.id!);
                          }}
                        >
                          Edit
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="reply-comment">
                <ReplyComment
                  reply={reply}
                  setReply={() => selectReply("")}
                  parentCommentId={item.id as any}
                  id={item.id}
                  uid={uid}
                  detailId={id as any}
                  listCommentReply={listComment}
                />
              </div>
            </div>
          )
        )}
      </div>
    </Section>
  );
}

export default Comment;
