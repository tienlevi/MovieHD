import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReplyIcon from "@mui/icons-material/Reply";
import { toast } from "react-toastify";
import useAuthStageChange from "../../hooks/useAuthStageChange";
import User from "../../interface/user";
import CommentInterface from "../../interface/comment";
import {
  deleteComment,
  editComment,
  editCommentTvShow,
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
  id?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  update_at?: any;
  comment: string;
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
  const location = useLocation();

  const { user } = useAuthStageChange();
  const form = useForm<Inputs>();
  const formConfirm = useForm();
  const [select, setSelect] = useState<string>("");
  const [lists, setLists] = useState([]);
  let indexReply = 2;

  useEffect(() => {
    const getData = async () => {
      const response: any = await getComments(detailId);
      setLists(response);
    };
    getData();
  }, []);

  const replyCommentId = async (data: any) => {
    try {
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
      setLists((): any => {
        return [...lists, add];
      });
    } catch (error) {
      console.log(error);
    }
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
    const editItem: any = lists.map((item: User) =>
      item.id === data.id ? data : item
    );
    setLists(editItem);
    setSelect(data);
    toast.success("Edit success");
    if (location.pathname === `/detail/${detailId}`) {
      await editComment(data.id, data.comment, data.update_at);
    } else {
      await editCommentTvShow(data.id, data.comment, data.update_at);
    }
  };

  const handleSelect = (id: any, data: any) => {
    const selectItem = listCommentReply.find(
      (user: CommentInterface) => user.id === id
    );
    setSelect(selectItem?.id as any);
    if (selectItem) {
      formConfirm.reset(data);
    }
    return selectItem;
  };

  const handleReply = (id: any) => {
    const selectReply = listCommentReply.find(
      (user: CommentInterface) => user.id === id
    );
    setReply(selectReply?.id as any);
  };
  console.log();

  return (
    <div className="list-comment-reply">
      {reply === id && (
        <form
          onSubmit={form.handleSubmit(replyCommentId)}
          className="comment-input"
        >
          <textarea
            {...form.register("comment", { required: true })}
          ></textarea>
          {form.formState.errors?.comment?.type === "required" && (
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

      {/* <div className="reply-comment-view">
        <ReplyIcon />
        <p>View Reply</p>
      </div> */}

      {lists.map((item: CommentInterface, index: number) =>
        select === item.id ? (
          <form
            key={index}
            onSubmit={formConfirm.handleSubmit(handleEdit)}
            className="comment-input"
          >
            <textarea
              {...formConfirm.register("comment", { required: true })}
            ></textarea>
            {formConfirm.formState.errors?.comment?.type === "required" && (
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
                            onClick={() => handleSelect(item.id, item)}
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

export default memo(ReplyComment);
