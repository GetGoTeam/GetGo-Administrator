import "./SlidingTabs.scss";
import { useState, useMemo } from "react";
import colors from "../../../../utils/base.scss";
import FadeInOut from "../BackDrop/FadeInOut";

function SlidingTabs(props) {
  const { tab1, tab2 } = props;
  const [tabContent, setTabContent] = useState(tab1.content);
  const [tabStatus, setTabStatus] = useState(true);
  const duration = 250;
  var firstRender = false;

  useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    firstRender = true;
  }, []);

  return (
    <>
      <div className="slidingTabs-container">
        <div className="tabs">
          <input type="radio" id="radio-1" name="tabs" />
          <label
            className="tab"
            htmlFor="radio-1"
            style={{ color: tabContent === tab1.content && firstRender ? colors.primary_900 : "" }}
            onClick={() => {
              setTabStatus(false);
              setTimeout(() => {
                setTabContent(tab1.content);
                setTabStatus(true);
              }, duration + 100);
            }}
          >
            {tab1.name}
          </label>

          <input type="radio" id="radio-2" name="tabs" />
          <label
            className="tab"
            htmlFor="radio-2"
            onClick={() => {
              setTabStatus(false);
              setTimeout(() => {
                setTabContent(tab2.content);
                setTabStatus(true);
              }, duration + 100);
            }}
          >
            {tab2.name}
          </label>
          <span className="glider"></span>
        </div>
      </div>
      <FadeInOut show={tabStatus} duration={duration}>
        {tabContent}
      </FadeInOut>
    </>
  );
}

export default SlidingTabs;
