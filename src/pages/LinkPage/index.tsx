import React from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "components/Avatar";
import styled from "styled-components";
import colors from "styles/colors";
import type { ItemType } from "../../api/getItemData";
import { fileSizeCalculate } from "utils/fileSizeCalculate";
import { expiresDate } from "utils/expiresDate";

import { el } from "date-fns/locale";

interface LinkPageProps {
  itemInfoList: ItemType[];
}

const LinkPage: FC<LinkPageProps> = ({ itemInfoList }: LinkPageProps) => {
  const navigate = useNavigate();

  const moveToDetailPage = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const id = (e.target as HTMLParagraphElement).dataset.id;
    navigate(`/detail?id=${id}`);
  };

  const handleClickUrlBtn = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    createdAt: number,
    expiresAt: number
  ) => {
    const id = (e.target as HTMLAnchorElement).dataset.id;
    const url = `http://localhost:3000/detail?id=${id}`;
    console.log(url);
    if (expiresAt - createdAt <= 0) {
      return;
    } else {
      navigator.clipboard.writeText(url);
      window.alert(`${url}주소가 복사 되었습니다.`);
    }
  };

  const validityInspection = (expiresAt: number) => {
    console.log(expiresAt * 1000);
    const expriesAtTime = expiresAt * 1000;
    const now = new Date(1632973932000);
    const nowNum = 1632973932000;
    const cal = nowNum - expriesAtTime;
    console.log(cal);
    if (cal < 0) console.log("만료됨");
    else if (nowNum <= nowNum - expriesAtTime) {
      console.log("X일");
    } else {
      console.log("xx 시간 xx분");
    }
    return "";
  };

  return (
    <>
      <Title>마이 링크</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>파일개수</TableCell>
            <TableCell>크기</TableCell>
            <TableCell>유효기간</TableCell>
            <TableCell>받은사람</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemInfoList.map((itemInfo: ItemType, index) => {
            return (
              <TableRow key={itemInfo.key}>
                <TableCell>
                  <LinkInfo>
                    <LinkImage>
                      <img
                        referrerPolicy="no-referrer"
                        src="/svgs/default.svg"
                        alt=""
                      />
                    </LinkImage>
                    <LinkTexts>
                      <LinkTitle
                        data-id={itemInfo.key}
                        onClick={moveToDetailPage}
                      >
                        {itemInfo?.sent ? itemInfo.sent.subject : "무제"}
                      </LinkTitle>
                      <LinkUrl
                        id="linkUrl"
                        data-id={itemInfo.key}
                        onClick={(e) =>
                          handleClickUrlBtn(
                            e,
                            itemInfo.created_at,
                            itemInfo.expires_at
                          )
                        }
                      >
                        {expiresDate(itemInfo.expires_at)
                          ? `localhost/detail/${itemInfo.key}`
                          : "만료됨"}
                      </LinkUrl>
                    </LinkTexts>
                  </LinkInfo>
                  <span />
                </TableCell>
                <TableCell>
                  <span>파일개수</span>
                  <span>{itemInfo.count.toLocaleString("ko-KR")}</span>
                </TableCell>
                <TableCell>
                  <span>파일사이즈</span>
                  <span>{fileSizeCalculate(itemInfo.size)}</span>
                </TableCell>
                <TableCell>
                  <span>유효기간</span>
                  <span>{validityInspection(itemInfo.expires_at)}</span>
                </TableCell>
                <TableCell>
                  <span>받은사람</span>
                  <LinkReceivers>
                    {itemInfo?.sent && <Avatar text="recruit@estmob.com" />}
                  </LinkReceivers>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default LinkPage;

const Title = styled.h2`
  color: ${colors.grey700};
  letter-spacing: -0.62px;
  word-break: keep-all;
  margin: 0;
`;

const Table = styled.table`
  margin-top: 24px;
  margin-bottom: 102px;
  width: 100%;
  display: table;
  position: relative;
  text-align: left;
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
  border-spacing: 0px;
  color: ${colors.grey600};
`;

const TableHead = styled.thead`
  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableBody = styled.tbody`
  font-weight: 400;
  cursor: pointer;

  tr {
    @media (max-width: 768px) {
      float: left;
      width: calc(100% - 40px);
      position: relative;
      box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.07);
      margin-bottom: 30px;
      background-color: ${colors.white};
      border-radius: 4px;
      padding: 0px 20px 20px 20px;
    }
  }

  th {
    font-size: 14px;

    & > span:first-child {
      display: none;
    }

    @media (max-width: 768px) {
      width: 100%;
      border-bottom: none;
      padding: 20px 0;
      border-top: 1px solid;
      border-color: ${colors.grey200};
      display: flex;
      justify-content: space-between;

      & > span:first-child {
        display: inline-block;
      }
      & > *:last-child {
        display: inline-block;
      }
      &:first-child {
        border-top: none;
      }
    }
  }
`;

const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0px;
  font-weight: inherit;
  font-size: inherit;
`;

const TableCell = styled.th`
  font-weight: inherit;
  font-size: inherit;
  font-size: 12px;
  line-height: 24px;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid ${colors.grey300};
  text-align: left;
  padding: 16px;
`;

const LinkInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LinkImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 4px;
  }
`;

const LinkTexts = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  & > * {
    margin: 0;
  }
`;

const LinkTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.grey700};
`;

const LinkUrl = styled.a`
  text-decoration: underline;

  :hover {
    color: ${colors.teal700};
  }
`;

const LinkReceivers = styled.div`
  display: flex;

  & > * + * {
    margin-left: 8px;
  }
`;
