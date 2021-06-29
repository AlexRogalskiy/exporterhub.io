import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Dataviewer from "./Dataviewer";
import remarkMarkdown from "../remarkMarkdown";
import { useParams } from "react-router";
import { API_SURVER } from "../../../config";

const Helm = ({ title }) => {
  const { id } = useParams();
  const [githubContent, setGithubContent] = useState();
  const [mdSha, setMdSha] = useState();
  const [codeSha, setCodeSha] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleMode = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isEditMode]);

  const getData = () => {
    const TOKEN = sessionStorage.getItem("access_token");
    const HEADER = TOKEN && { Authorization: TOKEN };

    axios({
      method: "GET",
      url: `${API_SURVER}/exporter/${id}/tab?type=helm`,
      headers: HEADER,
    })
      .then((res) => {
        setGithubContent(
          res.data.md_content === null ? "N/A" : res.data.md_content
        );
        setMdSha(res.data.md_sha);
        setCodeSha(res.data.code_sha);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markDownContent = remarkMarkdown(githubContent);

  return (
    <Container>
      <Dataviewer
        githubContent={githubContent}
        markDownContent={markDownContent}
        isEditMode={isEditMode}
        handleMode={handleMode}
        title={title}
        file=".yaml"
        type="_helm"
        mdSha={mdSha}
        codeSha={codeSha}
      />
    </Container>
  );
};
export default Helm;
const Container = styled.div`
  ${({ theme }) => theme.container}
  position: relative;
`;
