import Section from "../Section/Section";
import "./style.scss";

interface Props {
  MovieId: string;
  ListComment: [];
  userId: any;
}

function Comment({ MovieId, ListComment, userId }: Props) {
  return (
    <Section className="">
      <div className="comment-title">
        <h1>Comment</h1>
      </div>
      <form className="comment-input">
        <textarea name="" id=""></textarea>
        <input type="submit" value="Post" />
      </form>
      <div className="list-comment">
        <div className="comment-item">
          <div className="comment-item-user">
            <div className="comment-item-img">
              <img
                src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/428603964_959225372291727_3154299900890151625_n.jpg?stp=dst-jpg_p148x148&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFyXdbP7wRMgY-IEZlk8ton71QItr2WXdvvVAi2vZZd2xCNeppjRHvDePP-dabVAmnE8H0mUNN1G1iPaMHvm6Vf&_nc_ohc=7aoj_gywIr8AX8zaWLX&_nc_ht=scontent.fhan5-9.fna&oh=00_AfBHUXvzOYV7NIIbKCuePX9YcqunAX1x9PjcXg-Joo5JDA&oe=660005D4"
                alt=""
              />
            </div>
            <div className="content-item-name-date">
              <div className="comment-item-name">
                <h2>Kecia A. Parada</h2>
              </div>
              <div className="comment-item-date">
                <p>July 04, 2023, 10.30PM</p>
              </div>
            </div>
          </div>
          <div className="comment-item-content">
            There are many variations of passage available but the majority have
            suffered alteration in some form by injected humour randomised words
            undoubtable look even slightly believable. If you are going to use a
            passage you need to be sure there isn't anything embarrassing hidden
            in the middle of text. All the generators on the Internet tend to
            repeat predefined chunks as necessary making this the first true
            generator on the Internet.
          </div>
        </div>
        <div className="comment-item">
          <div className="comment-item-user">
            <div className="comment-item-img">
              <img
                src="https://yt3.ggpht.com/5NPuTDxN3DB7JiyOgwuPv5OV9lGG4_-AUYsFVpr-WLr11Lqi90krGfWmju26UhWmilRDA1qaEg=s88-c-k-c0x00ffffff-no-nd-rj"
                alt=""
              />
            </div>
            <div className="content-item-name-date">
              <div className="comment-item-name">
                <h2>Kecia A. Parada</h2>
              </div>
              <div className="comment-item-date">
                <p>July 04, 2023, 10.30PM</p>
              </div>
            </div>
          </div>
          <div className="comment-item-content">
            There are many variations of passage available but the majority have
            suffered alteration in some form by injected humour randomised words
            undoubtable look even slightly believable. If you are going to use a
            passage you need to be sure there isn't anything embarrassing hidden
            in the middle of text. All the generators on the Internet tend to
            repeat predefined chunks as necessary making this the first true
            generator on the Internet.
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Comment;
