"use client";

const Home = () => {
  const categories = [{ name: "kotodama", displayName: "ことだま生成器" }];

  return (
    <main className="p-top">
      <section>
        <div className="p-top__mv">
          <p className="p-top__mvText">
            あなたにピッタリの診断を。 暇つぶし、自己分析、恋愛、運勢まで。
          </p>
        </div>
      </section>

      <section>
        <h2>できること</h2>
        <p></p>
      </section>

      <section>
        <h2>診断一覧</h2>
        <ul>
          {categories.map((category, i) => (
            <a key={i} href={`/quiz/${category.name}`}>
              {category.displayName}
            </a>
          ))}
        </ul>
      </section>

      <section></section>
    </main>
  );
};

export default Home;
