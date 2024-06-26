import { useCallback, useEffect, useState } from "react";
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
  id?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  update_at?: any;
  comment: string;
  parentCommentId: string;
}

function Comment({ uid, id, type }: Props) {
  const form = useForm<Inputs>();
  const formConfirm = useForm<Inputs>();
  const [listComment, setListComment] = useState<CommentInterface[]>([]);
  const [select, setSelect] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response: any = await getComments(id as any);
      setListComment(response);
    };
    getData();
  }, []);

  const handleAdd = useCallback(
    async (data: any) => {
      const response = await addComment(
        id,
        user?.uid,
        user?.displayName,
        user?.photoURL,
        "movie",
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
      setListComment((prev): any => [...prev, add]);
      toast.success("Add success");
    },
    [listComment]
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are sure want to delete ?")) {
      await deleteComment(id);
      const deleteItem = listComment.filter((item: User) => item.id !== id);
      setListComment(deleteItem);
      toast.error("Delete success");
    }
  };

  const handleEdit = useCallback(
    async (data: any) => {
      await editComment(data.id, data.comment, data.update_at);
      const editItem = listComment.map((item: User) =>
        item.id === data.id ? data : item
      );
      toast.success("Edit success");
      setListComment(editItem);
    },
    [listComment]
  );

  const handleSelect = (id: any) => {
    const selectItem = listComment.find(
      (item: CommentInterface) => item.id === id
    );
    setSelect(selectItem?.id as any);
    if (selectItem) {
      formConfirm.reset({
        id: selectItem.id,
        displayName: selectItem.displayName,
        uid: selectItem.uid,
        photoURL: selectItem.photoURL,
        comment: selectItem.comment,
        update_at: new Date().toLocaleString(),
      });
    }
    return selectItem;
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
      <form onSubmit={form.handleSubmit(handleAdd)} className="comment-input">
        <textarea {...form.register("comment", { required: true })}></textarea>
        {form.formState.errors?.comment?.type === "required" && (
          <p style={{ color: "red " }}>Validate</p>
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
              onSubmit={formConfirm.handleSubmit(handleEdit)}
              className="comment-input"
            >
              <textarea
                {...formConfirm.register("comment", { required: true })}
              ></textarea>
              {form.formState.errors?.comment?.type === "required" && (
                <p style={{ color: "red " }}>Validate</p>
              )}
              <div key={index} className="comment-item-btn-select">
                <div
                  className="comment-item-btn-cancel"
                  onClick={() => setSelect("")}
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
                          onClick={() => handleSelect(item.id)}
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
