import { createReactInlineContentSpec } from "@blocknote/react";
import { AIInputForm } from "./InlineAIwindow";
// The Mention inline content.
export const AiGenerate = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      user: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => (
      <div>
        <span style={{ backgroundColor: "#8400ff33" }}>
          @{props.inlineContent.props.user}
        </span>
      </div>
    ),
  }
);
