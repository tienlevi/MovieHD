import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReplyIcon from "@mui/icons-material/Reply";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import User from "../../interface/user";
import CommentInterface from "../../interface/comment";
import {
  deleteComment,
  editComment,
  getComments,
  replyComment,
} from "../../config/action";

interface Props extends User {
  reply: string;
  setReply: (value: any) => void;
  listCommentReply: User[];
  parentCommentId: string;
  detailId: string;
}

interface Inputs {
  id: string;
  comment: string;
  commentConfirm: string;
}

function ReplyComment({
  reply,
  setReply,
  listCommentReply,
  parentCommentId,
  id,
  detailId,
  uid,
}: Props) {
  const { user } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [select, setSelect] = useState<string | null>(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getComments(detailId);
      setLists(response);
    };
    getData();
  }, []);

  const replyCommentId = async (data: any) => {
    const add = {
      id: detailId,
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      comment: data.comment,
      parentCommentId: reply,
      create_at: new Date().toLocaleString(),
    };
    await replyComment(
      detailId,
      user?.uid,
      user?.displayName,
      user?.photoURL,
      data.comment,
      reply
    );
    toast.success("Add success");
    setLists((): any => [...lists, add]);
    setSelect(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are sure want to delete ?")) {
      await deleteComment(id);
      const deleteItem = lists.filter((item: User) => item.id !== id);
      setLists(deleteItem);
      toast.error("Delete success");
    }
  };

  const handleEdit = async (data: any) => {
    const result: any = lists.find((item: any) => item.id === select);
    const newComment = { ...result, comment: data.commentConfirm };
    const editItem: any = lists.map((item: any) =>
      item.id === data.id ? newComment : item
    );
    await editComment(newComment);
    setSelect(null);
    toast.success("Edit success");
    setLists(editItem);
  };

  const handleReply = (id: any) => {
    const selectReply = listCommentReply.find((user: any) => user.id === id);
    setReply(selectReply?.id as any);
  };

  return (
    <div className="list-comment-reply">
      {reply === id && (
        <form onSubmit={handleSubmit(replyCommentId)} className="comment-input">
          <textarea {...register("comment", { required: true })}></textarea>
          {errors?.comment?.type === "required" && (
            <p style={{ color: "red " }}>Validate</p>
          )}
          {user && (
            <div className="comment-input-reply">
              <div
                className="comment-item-btn-cancel"
                onClick={() => setReply("")}
              >
                Cancel
              </div>
              <button
                className="comment-item-btn-add"
                style={{ border: "none", marginLeft: 10 }}
              >
                Add
              </button>
            </div>
          )}
        </form>
      )}
      {lists.map((item: CommentInterface, index: number) =>
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
                type="submit"
                className="comment-item-btn-confirm"
                style={{ border: "none" }}
              >
                Confirm
              </button>
            </div>
          </form>
        ) : (
          <div key={index}>
            {parentCommentId === item.parentCommentId &&
              parentCommentId !== undefined && (
                <>
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
                        onClick={() => handleReply(item.id)}
                        className="comment-item-reply"
                      >
                        <ReplyIcon style={{ fontSize: 20 }} />
                        <p>Reply</p>
                      </div>
                      {uid === item.uid && (
                        <div className="comment-item-btn">
                          <div
                            className="comment-item-btn-delete"
                            onClick={() => handleDelete(item.id as any)}
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
                </>
              )}
          </div>
        )
      )}
    </div>
  );
}

export default ReplyComment;
