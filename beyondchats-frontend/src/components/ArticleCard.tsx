import type { Article } from "../types";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-semibold">{article.title}</h2>

      {/* Original Article */}
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">
          Original Article
        </p>
        <p className="text-gray-700 whitespace-pre-line">
          {article.content.slice(0, 600)}...
        </p>
      </div>

      {/* AI Updated */}
      {article.isUpdated && article.updatedContent && (
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-500 mb-1">
            AI-Updated Article
          </p>
          <p className="text-gray-700 whitespace-pre-line">
            {article.updatedContent.slice(0, 800)}...
          </p>

          {/* References */}
          {article.references && (
            <div className="mt-3">
              <p className="font-medium">References</p>
              <ul className="list-disc list-inside">
                {article.references.map((ref, idx) => (
                  <li key={idx}>
                    <a
                      href={ref.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
