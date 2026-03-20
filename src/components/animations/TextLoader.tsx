export function TextLoader() {
  return (
    <div className="inline-flex items-center gap-2">
      <style>
        {`
          .text-loader-card {
            background-color: rgba(31, 60, 136, 0.05);
            padding: 0.5rem 1.5rem;
            border-radius: 1rem;
          }
          .text-loader {
            color: rgb(100, 116, 139);
            font-family: "Inter", sans-serif;
            font-weight: 500;
            font-size: 1.25rem;
            box-sizing: border-box;
            height: 32px;
            padding: 4px 8px;
            display: flex;
            border-radius: 8px;
          }

          .text-loader-words {
            overflow: hidden;
            position: relative;
          }
          .text-loader-words::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              rgba(31, 60, 136, 0.05) 10%,
              transparent 30%,
              transparent 70%,
              rgba(31, 60, 136, 0.05) 90%
            );
            z-index: 20;
          }

          .text-loader-word {
            display: block;
            height: 100%;
            padding-left: 6px;
            background: linear-gradient(135deg, #1F3C88, #22D3EE, #7C6CF6);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: spin_words 6s infinite;
          }

          @keyframes spin_words {
            10% {
              transform: translateY(-105%);
            }
            20% {
              transform: translateY(-100%);
            }
            30% {
              transform: translateY(-205%);
            }
            40% {
              transform: translateY(-200%);
            }
            50% {
              transform: translateY(-305%);
            }
            60% {
              transform: translateY(-300%);
            }
            70% {
              transform: translateY(-405%);
            }
            80% {
              transform: translateY(-400%);
            }
            90% {
              transform: translateY(-505%);
            }
            100% {
              transform: translateY(-500%);
            }
          }
        `}
      </style>
      <div className="text-loader-card">
        <div className="text-loader">
          <p>Generating</p>
          <div className="text-loader-words">
            <span className="text-loader-word">projects</span>
            <span className="text-loader-word">ideas</span>
            <span className="text-loader-word">blueprints</span>
            <span className="text-loader-word">concepts</span>
            <span className="text-loader-word">roadmaps</span>
            <span className="text-loader-word">projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
