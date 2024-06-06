import { useState, memo } from "react";
import { useForm } from "react-hook-form";
import ReplyIcon from "@mui/icons-material/Reply";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useAuthStageChange from "../../hooks/useAuthStageChange";
import Section from "../Section/Section";
import ReplyComment from "./ReplyComment";
import CommentInterface from "../../interface/comment";
import "./style.scss";

interface Props extends CommentInterface {
  listComment: CommentInterface[];
  onAdd: (data: any) => void;
  onDelete: (id: string) => void;
  onEdit: (data: any) => void;
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

function Comment({ listComment, id, uid, onAdd, onDelete, onEdit }: Props) {
  const form = useForm<Inputs>();
  const formConfirm = useForm<Inputs>();
  const [select, setSelect] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [showReply, setShowReply] = useState<boolean>(false);
  const { user } = useAuthStageChange();

  const onSubmit = (data: any) => {
    onAdd(data);
  };

  const onSubmitConfirm = (data: any) => {
    onEdit(data);
    setSelect(select);
  };

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-input">
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
              onSubmit={formConfirm.handleSubmit(onSubmitConfirm)}
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
              {item.parentCommentId === undefined && (
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
                          onClick={() => onDelete(item?.id as any)}
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

export default memo(Comment);
