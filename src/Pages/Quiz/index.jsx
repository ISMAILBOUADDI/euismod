import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, useLocation } from "react-router-dom";
import Info from "./Info";
import QuizSidebar from "../../components/QuizSidebar";
import QuizTemplate from "./QuizTemplate";
import { motion } from "framer-motion";
import Results from "./Results";

function Quiz() {
  const location = useLocation();
  const [isSideNavShowing, setIsSideNavShowing] = useState(true);

  const data1 = JSON.parse(localStorage.getItem("question1Data"));
  const data2 = JSON.parse(localStorage.getItem("question2Data"));
  const data3 = JSON.parse(localStorage.getItem("question3Data"));
  const data4 = JSON.parse(localStorage.getItem("question4Data"));
  const data5 = JSON.parse(localStorage.getItem("question5Data"));

  const [question1Data, setQuestion1Data] = useState(data1 ?? -1);
  const [question2Data, setQuestion2Data] = useState(
    data2 ?? {
      gridTemplateArea1: "",
      gridTemplateArea2: "",
      gridTemplateArea3: "",
    }
  );
  const [question3Data, setQuestion3Data] = useState(data3 ?? -1);
  const [question4Data, setQuestion4Data] = useState(
    data4 ?? {
      gridTemplateCols: "",
      gridTemplateRows: "",
    }
  );
  const [question5Data, setQuestion5Data] = useState(data5 ?? -1);

  useEffect(() => {
    localStorage.setItem("question1Data", JSON.stringify(question1Data));
    console.log("changed");
  }, [question1Data]);

  useEffect(() => {
    localStorage.setItem("question2Data", JSON.stringify(question2Data));
  }, [question2Data]);

  useEffect(() => {
    localStorage.setItem("question3Data", JSON.stringify(question3Data));
  }, [question3Data]);

  useEffect(() => {
    localStorage.setItem("question4Data", JSON.stringify(question4Data));
  }, [question4Data]);

  useEffect(() => {
    localStorage.setItem("question5Data", JSON.stringify(question5Data));
  }, [question5Data]);

  return (
    <Container>
      {location.pathname !== "/quiz" &&
        (location.pathname !== "/quiz/" ? (
          <QuizSidebar
            isSideNavShowing={isSideNavShowing}
            setIsSideNavShowing={setIsSideNavShowing}
          />
        ) : (
          <span />
        ))}

      <Route exact path="/quiz">
        <Info />
      </Route>
      <Route exact path="/quiz/1">
        <QuizTemplate
          index={1}
          codeLines={[
            { indent: 0, text: "display: grid;" },
            { indent: 0, text: "grid-template-columns: 200px 200px;" },
            { indent: 0, text: "grid-template-rows: 300px 300px;" },
          ]}
          questionText="What type of grid does the code above create?"
          choices={[
            "A grid with 2 columns of 200px width each and 3 rows with 300 px height each.",
            "A grid with 2 columns of 200px width each and 2 rows with 300px height each.",
            "A flexbox layout.",
            "A grid with 2 columns of 300px width and 2 rows of 200 px width each.",
          ]}
          nextQuestion="/quiz/2"
          answerData={question1Data}
          setAnswerData={setQuestion1Data}
        />
      </Route>
      <Route exact path="/quiz/2">
        <QuizTemplate
          index={2}
          imgSrc="https://etesam.nyc3.digitaloceanspaces.com/Euismod/Question_2.png"
          questionText="Recreate the image above using the same area names."
          previousQuestion="/quiz/1"
          nextQuestion="/quiz/3"
          imgAlt="Quiz 2 Diagram"
          answerData={question2Data}
          setAnswerData={setQuestion2Data}
        />
      </Route>
      <Route exact path="/quiz/3">
        <QuizTemplate
          index={3}
          codeLines={[
            { indent: 0, text: ".grid-item" },
            { indent: 1, text: "justify-self: right;" },
            { indent: 1, text: "align-self: end;" },
            { indent: 0, text: "}" },
          ]}
          previousQuestion="/quiz/2"
          nextQuestion="/quiz/4"
          questionText="How is the grid item aligned based on the above code?"
          choices={[
            "It is aligned to the top vertically and to the right horizontally.",
            "It is aligned to the left horizontally and to the top vertically.",
            "It is aligned to the right horizontally and to the bottom vertically.",
            "It is aligned to the bottom vertically and to the left horizontally.",
          ]}
          answerData={question3Data}
          setAnswerData={setQuestion3Data}
        />
      </Route>
      <Route exact path="/quiz/4">
        <QuizTemplate
          index={4}
          previousQuestion="/quiz/3"
          nextQuestion={"/quiz/5"}
          questionText="Convert the grid dimensions above into fractional units."
          codeLines={[
            { indent: 0, text: "display: grid;" },
            {
              indent: 0,
              text: "grid-template-columns: 10% 10% 10% 35% 35%;",
            },
            { indent: 0, text: "grid-template-rows: 10% 45% 45%;" },
          ]}
          answerData={question4Data}
          setAnswerData={setQuestion4Data}
        />
      </Route>
      <Route exact path="/quiz/5">
        <QuizTemplate
          index={5}
          previousQuestion="/quiz/4"
          questionText="What does the above CSS code do?"
          codeLines={[{ indent: 0, text: "grid-gap: 5px" }]}
          choices={[
            "It gives a horizontal gap of 10px and a vertical gap of 5px between grid items.",
            "It gives a vertical gap of 10px and a horizontal gap of 5px between two grids.",
            "It gives a vertical gap of 10px and a horizontal gap of 5px between grid items.",
            "It gives both a horizontal and vertical gap of 5px between grid items.",
          ]}
          answerData={question5Data}
          setAnswerData={setQuestion5Data}
        />
      </Route>
      <Route exact path="/quiz/results">
        <Results />
      </Route>
    </Container>
  );
}

const Container = styled(motion.section)`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;
export default Quiz;
