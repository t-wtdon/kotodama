import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const text = typeof children === "string" ? children : "";

  const shareToX = () => {
    const tweet = encodeURIComponent(`${text} #ことだま生成器`);
    const url = encodeURIComponent("https://kotodama-psi.vercel.app/"); // 後でVercelのURLなどに置き換えてOK
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet}&url=${url}`;
    window.open(twitterUrl, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("名言をコピーしました！");
  };

  return (
    <div className="c-modal" onClick={onClose}>
      <div className="c-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button className="c-modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="c-modal__title">ことだまが生成されたよ</h2>
        <p className="c-modal__text">{children}</p>

        <div className="c-modal__buttons">
          <button className="c-modal__shareX" onClick={shareToX}>
            Xでシェア
          </button>
          <button className="c-modal__copy" onClick={copyToClipboard}>
            Instagram用にコピー
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
