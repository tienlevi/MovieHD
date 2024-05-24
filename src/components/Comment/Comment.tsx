import { useState } from "react";
import { useForm } from "react-hook-form";
import ReplyIcon from "@mui/icons-material/Reply";
import Section from "../Section/Section";
import "./style.scss";
import User from "../../interface/user";

interface Props extends User {
  listComment: User[];
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
}

function Comment({ listComment, uid, onAdd, onDelete, onEdit }: Props) {
  const form = useForm<Inputs>();
  const formConfirm = useForm<Inputs>();
  const [select, setSelect] = useState<string>("");

  const onSubmit = (data: any) => {
    onAdd(data);
  };

  const onSubmitConfirm = (data: any) => {
    setSelect(data);
    onEdit(data);
  };

  const handleSelect = (id: any) => {
    const selectItem = listComment.find((user: User) => user.id === id);
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
        {uid ? <button className="comment-item-btn-add">Add</button> : ""}
      </form>
      <div className="list-comment">
        {listComment.map((item: User, index: number) =>
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
              <div className="comment-item-btn-select">
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
            <div className="comment-item" key={index}>
              <div className="comment-item-user">
                <div className="comment-item-img">
                  <img src={item.photoURL} alt="" />
                </div>
                <div className="content-item-name-date">
                  <div className="comment-item-name">
                    <h2>{item.displayName}</h2>
                  </div>
                  <div className="comment-item-date">
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
              {uid === item.uid && (
                <div key={index} className="comment-item-action">
                  <div className="comment-item-reply">
                    <ReplyIcon style={{ fontSize: 20 }} />
                    <p>Reply</p>
                  </div>
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
                </div>
              )}
            </div>
          )
        )}
      </div>
    </Section>
  );
}

export default Comment;
