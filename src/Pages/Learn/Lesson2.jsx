import React, { useContext, useRef } from "react";
import {
  CodeContainer,
  CodeLine,
  FlexContainer,
  GridItem,
  LessonGrid,
  Property,
  Sandbox,
} from "../../styling/GeneralComponents";
import { Header1, Header2, Paragraph } from "../../styling/Headers";
import { SandboxContent2 } from "../../components/Sandboxes";
import StyledInput from "../../components/Input";
import { AppContext } from "../../Contexts";
import StyledButton from "../../components/Button";
import { renderSubmitText } from "./helpers";
import { checkSecondSolution } from "../../functions/SolutionChecks";

function Lesson2({ setIsSideNavShowing, lesson2Data, setLesson2Data }) {
  const { size } = useContext(AppContext);
  const justifySelfRef = useRef(null);
  const alignSelfRef = useRef(null);
  const boxData = [0, 0, 0, 0, 0, 0];
  const htmlBoxes = boxData.map((val, index) => {
    return (
      <CodeLine textIndent="1em" key={"box-" + index}>
        &#60;div class="box"&#62;&#60;/div&#62;
      </CodeLine>
    );
  });

  function onSubmit() {
    const tempSolObj = checkSecondSolution(justifySelfRef, alignSelfRef);
    const tempLesson = { ...lesson2Data };
    tempLesson.solutionObj = tempSolObj;
    setLesson2Data(tempLesson);
    localStorage.setItem("lesson2Data", JSON.stringify(tempLesson));

    if (tempSolObj.isSolved) {
      setIsSideNavShowing(true);
    }
  }

  return (
    <div>
      <Header1 textAlign="center">Item Placement</Header1>
      <LessonGrid>
        <GridItem gridArea={"sandbox"}>
          <Header2 textAlign="center">See Changes</Header2>
          <Sandbox>
            <SandboxContent2
              justifySelf={lesson2Data.justifySelf}
              alignSelf={lesson2Data.alignSelf}
            />
          </Sandbox>
        </GridItem>
        <GridItem gridArea={"info"}>
          <Header2
            margin={size.width < 768 ? "0.25rem 0" : "2.5rem 0 0.75rem"}
            responsive
          >
            Info:
          </Header2>
          <Paragraph margin="0" responsive fontSize="1.1em">
            A grid item can be aligned horizontally by using the
            <Property>justify-self</Property> property. It can be aligned
            vertically by using the align-self property. For instance, to align
            an grid item to the center left of its grid container you would set{" "}
            <Property>justify-self: start</Property> and
            <Property>align-self: center</Property>.
          </Paragraph>
          <Header2 margin="0.75rem 0" responsive>
            Task:
          </Header2>
          <Paragraph margin="0" responsive fontSize="1.1em">
            Align each box to the bottom left of its grid container.
          </Paragraph>
        </GridItem>
        <GridItem gridArea={"css"}>
          <Header2 textAlign="center">CSS</Header2>
          <CodeContainer>
            <CodeLine>.box &#123;</CodeLine>
            <CodeLine textIndent="1em">height: 50px;</CodeLine>
            <CodeLine textIndent="1em">width: 50px;</CodeLine>
            <CodeLine textIndent="1em">background: red;</CodeLine>
            <CodeLine textIndent="1em">margin: 10px;</CodeLine>
            <CodeLine textIndent="1em">
              justify-self:
              <StyledInput
                passedRef={justifySelfRef}
                stateToUpdate={lesson2Data}
                setStateToUpdate={setLesson2Data}
                property="justifySelf"
              />
              ;
            </CodeLine>
            <CodeLine textIndent="1em">
              align-self:
              <StyledInput
                passedRef={alignSelfRef}
                stateToUpdate={lesson2Data}
                setStateToUpdate={setLesson2Data}
                property="alignSelf"
              />
              ;
            </CodeLine>
            <CodeLine>&#125;</CodeLine>
          </CodeContainer>
        </GridItem>
        <GridItem gridArea={"html"}>
          <Header2 textAlign="center">HTML</Header2>
          <CodeContainer>
            <CodeLine>&#60;div class="container"&#62;</CodeLine>
            {htmlBoxes}
            <CodeLine>&#60;/div&#62;</CodeLine>
          </CodeContainer>
        </GridItem>
      </LessonGrid>
      <FlexContainer
        flexDirection="column"
        alignItems="flex-end"
        padding="0 .45rem 0 0"
      >
        <StyledButton text="Submit" onClick={onSubmit} />
        {renderSubmitText(lesson2Data, setLesson2Data)}
      </FlexContainer>
    </div>
  );
}

export default Lesson2;
