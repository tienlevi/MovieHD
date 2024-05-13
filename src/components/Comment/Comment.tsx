import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Section from "../Section/Section";
import "./style.scss";
import { useState } from "react";

interface User {
  uid?: string;
  displayName?: string;
  photoURL?: string;
  comment?: string;
  create_at?: any;
}

interface Props extends User {
  ListComment: User[];
  onAdd: (data: any) => void;
}

interface Inputs {
  comment: string;
}

function Comment({ ListComment, uid, onAdd }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => {
    onAdd(data);
  };

  return (
    <Section className="">
      <div className="comment-title">
        <h1>Comment</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="comment-input">
        <textarea {...register("comment", { required: true })}></textarea>
        {errors?.comment?.type === "required" && (
          <p style={{ color: "red " }}>Validate</p>
        )}
        {uid ? <button>Add</button> : ""}
      </form>
      <div className="list-comment">
        {ListComment.map((item: User, index: number) => (
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
                  <p>{item.create_at}</p>
                </div>
              </div>
            </div>
            <div className="comment-item-content">{item.comment}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Comment;
