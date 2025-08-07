"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBrain, faComment } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Home = () => {
  const categories = [
    { name: "kotodama", displayName: "ことだま生成器" },
    { name: "kotodama", displayName: "ことだま生成器" },
  ];

  return (
    <main className="p-top">
      <section>
        <div className="p-top__mv">
          <div className="p-top__mvInner">
            <p className="p-top__mvText">
              お悩み相談も、ちょっとネタも。
              あなたに“ちょうどいい”コンテンツを。
            </p>

            <button className="p-top__button">はじめてみる</button>
          </div>
        </div>
      </section>

      <section className="p-top__features">
        <h2 className="p-top__heading">できること</h2>
        <p className="p-top__text">
          お悩み相談も、ちょっとしたネタも。あなたの“今”に寄り添う言葉を、シンプルに届けます。
          気になるキーワードを入れるだけで、
          ふっと心が軽くなるような「ひとこと」が見つかるかも。
        </p>

        <ul className="p-top__featureList">
          <li className="p-top__featureItem">
            <FontAwesomeIcon icon={faUser} className="p-top__featureIcon" />
            <p className="p-top__featureText">自分を知る</p>
          </li>
          <li className="p-top__featureItem">
            <FontAwesomeIcon icon={faComment} className="p-top__featureIcon" />
            <p className="p-top__featureText">モヤモヤを言語化</p>
          </li>
          <li className="p-top__featureItem">
            <FontAwesomeIcon icon={faBrain} className="p-top__featureIcon" />
            <p className="p-top__featureText">暇つぶし・ネタ診断も充実</p>
          </li>
        </ul>
      </section>

      <section className="p-top__service">
        <h2 className="p-top__heading">サービス一覧</h2>
        <ul className="p-top__serviceList">
          {categories.map((category, i) => (
            <li className="p-top__serviceItem" key={i}>
              <Link
                className="p-top__serviceLink"
                href={`/quiz/${category.name}`}
              >
                <Image
                  className="p-top__serviceImg"
                  src="/file.svg"
                  alt=""
                  width={64}
                  height={64}
                />
                <span className="p-top__serviceName">
                  {category.displayName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section></section>
    </main>
  );
};

export default Home;
