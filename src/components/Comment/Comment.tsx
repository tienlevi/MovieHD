import { useForm } from "react-hook-form";
import ReplyIcon from "@mui/icons-material/Reply";
import Section from "../Section/Section";
import "./style.scss";

interface User {
  id?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  comment?: string;
  create_at?: any;
}

interface Props extends User {
  listComment: User[];
  onAdd: (data: any) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, data: any) => void;
}

interface Inputs {
  comment: string;
}

function Comment({ listComment, uid, onAdd, onDelete }: Props) {
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
        {listComment.map((item: User, index: number) => (
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
                  <div className="comment-item-btn-edit">Edit</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Comment;
