import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import colors from "styles/colors";
import Button from "components/Button";
import { File, getTagetItemData } from "../../api/getItemData";
import type { ItemType } from "../../api/getItemData";
import { fileSizeCalculate } from "utils/fileSizeCalculate";
import { expiresDate } from "utils/expiresDate";

const DetailPage: FC = () => {
  const [itemDetailInfo, setItemDetailInfo] = useState<ItemType | null>(null);

  const queryID = new URLSearchParams(useLocation().search).get("id");
  const downLoadAlert = () => {
    window.alert("다운로드 되었습니다.");
  };

  const createDate = () => {
    if (itemDetailInfo) {
      const initialDate = new Date(itemDetailInfo.created_at * 1000);
      const years = initialDate.getFullYear();
      const month = initialDate.getMonth();
      const day = initialDate.getDay();
      const hour = initialDate.getHours();
      const minute = initialDate.getMinutes();
      return `${years}년 ${month + 1}월 ${day}일 ${hour}:${minute} +09:00`;
    }
  };

  useEffect(() => {
    async function getData() {
      const result = await getTagetItemData(queryID as string);

      setItemDetailInfo(result);
    }

    getData();
  }, []);
  console.log(itemDetailInfo);
  return (
    <>
      <Header>
        <LinkInfo>
          <Title>{itemDetailInfo?.sent?.subject}</Title>
          <Url>localhost/{itemDetailInfo?.key}</Url>
        </LinkInfo>
        <DownloadButton onClick={downLoadAlert}>
          <img referrerPolicy="no-referrer" src="/svgs/download.svg" alt="" />
          받기
        </DownloadButton>
      </Header>
      <Article>
        <Descrition>
          <Texts>
            <Top>링크 생성일</Top>
            <Bottom>{createDate()}</Bottom>
            <Top>메세지</Top>
            <Bottom>{itemDetailInfo?.sent?.content}</Bottom>
            <Top>다운로드 횟수</Top>
            <Bottom>{itemDetailInfo?.download_count}</Bottom>
          </Texts>
          <LinkImage>
            <Image />
          </LinkImage>
        </Descrition>
        <ListSummary>
          {expiresDate(
            (itemDetailInfo as ItemType) &&
              (itemDetailInfo as ItemType).expires_at
          ) ? (
            <div>총 {itemDetailInfo?.files.length}개의 파일</div>
          ) : (
            <div>총 0개의 파일</div>
          )}

          <div>
            {expiresDate(
              (itemDetailInfo as ItemType) &&
                (itemDetailInfo as ItemType).expires_at
            )
              ? fileSizeCalculate(
                  itemDetailInfo?.files.reduce(
                    (file, currentFile) => file + currentFile.size,
                    0
                  )
                )
              : "만료됨"}
          </div>
        </ListSummary>
        <FileList>
          {expiresDate(
            (itemDetailInfo as ItemType) &&
              (itemDetailInfo as ItemType).expires_at
          )
            ? itemDetailInfo?.files.map((file) => {
                return (
                  <FileListItem key={file.key}>
                    <FileItemInfo thumbnailUrl={file.thumbnailUrl}>
                      <span />
                      <span>{file.name}</span>
                    </FileItemInfo>
                    <FileItemSize>{fileSizeCalculate(file.size)}</FileItemSize>
                  </FileListItem>
                );
              })
            : null}
        </FileList>
      </Article>
    </>
  );
};

const Header = styled.header`
  display: flex;
  color: ${colors.grey600};
  margin-bottom: 32px;
`;

const LinkInfo = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 28px;
  color: ${colors.grey700};
  font-size: 20px;
`;

const Url = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  text-decoration: underline;
  line-height: 20px;
  font-size: 14px;

  :hover {
    color: ${colors.teal700};
  }
`;

const DownloadButton = styled(Button)`
  font-size: 16px;

  img {
    margin-right: 8px;
  }
`;

const Article = styled.article`
  border-radius: 4px;
  border-color: ${colors.grey200};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 0 0 1px rgb(0 20 61 / 8%), 0 3px 3px 0 rgb(0 20 61 / 4%);
  background-color: ${colors.white};
  color: ${colors.grey600};
  font-size: 14px;
  font-weight: 400;
`;

const Descrition = styled.div`
  display: flex;
  padding: 36px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 24px;
  }
`;

const Texts = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Top = styled.label`
  font-weight: 600;
  line-height: 20px;
`;

const Bottom = styled.p`
  color: ${colors.grey700};
  margin: 8px 0 24px;
`;

const LinkImage = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background-color: ${colors.grey50};

  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }
`;

const Image = styled.span`
  width: 120px;
  display: inline-block;
  background-image: url(/svgs/default.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100%;
`;

const ListSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 36px;
  font-weight: 600;
  border-top: 1px solid;
  border-color: ${colors.grey200};

  @media (max-width: 768px) {
    padding: 12px 24px;
  }
`;

const FileList = styled.ul`
  border-top: 1px solid;
  border-color: ${colors.grey200};
  padding: 0;
  margin: 0;
  padding: 0 36px;
  color: ${colors.grey700};

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  & > li + li {
    border-top: 1px solid;
    border-color: ${colors.grey200};
  }
`;

const FileListItem = styled.li`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileItemInfo = styled.div<{ thumbnailUrl: string }>`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  align-items: center;
  span:first-child {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    display: inline-block;
    background-image: url(${(props) => props.thumbnailUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const FileItemSize = styled.div``;

export default DetailPage;
