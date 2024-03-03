import Section from "../Section/Section";
import "./style.scss";

function Partner() {
  return (
    <div className="partner">
      <Section className="partner-content">
        <div className="partner-title">
          <h2>Partner</h2>
        </div>
        <div className="partner-title">
          <h1>
            Our Awesome <span>Partners</span>
          </h1>
        </div>
        <div className="partner-wrapper">
          <div className="partner-wrapper-children">
            <img
              src="https://live.themewild.com/moplay/assets/img/partner/01.png"
              alt=""
              width={150}
            />
          </div>
          <div className="partner-wrapper-children">
            <img
              src="https://live.themewild.com/moplay/assets/img/partner/02.png"
              alt=""
              width={150}
            />
          </div>
          <div className="partner-wrapper-children">
            <img
              src="https://live.themewild.com/moplay/assets/img/partner/03.png"
              alt=""
              width={150}
            />
          </div>
          <div className="partner-wrapper-children">
            <img
              src="https://live.themewild.com/moplay/assets/img/partner/04.png"
              alt=""
              width={150}
            />
          </div>
          <div className="partner-wrapper-children">
            <img
              src="https://live.themewild.com/moplay/assets/img/partner/05.png"
              alt=""
              width={150}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Partner;
