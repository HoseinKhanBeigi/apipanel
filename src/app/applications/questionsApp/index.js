import { Grid, Typography } from "@mui/material";

export const QuestionsApp = () => {
  const list = [
    {
      title: "1 موضوع",

      subtitles: [
        {
          title:
            "QuestionsApp QuestionsApp QuestionsApp QuestionsAppQuestionsApp",
          desc: "In practice, transformers use multi-head attention, meaning that the attention mechanism is run multiple times in parallel with different weight matrices. This allows the model to learn different types of relationships between words simultaneously. The results from all the heads are concatenated and transformed to produce the final output.",
        },
        {
          title:
            "QuestionsApp QuestionsApp QuestionsApp QuestionsAppQuestionsApp",
          desc: "In practice, transformers use multi-head attention, meaning that the attention mechanism is run multiple times in parallel with different weight matrices. This allows the model to learn different types of relationships between words simultaneously. The results from all the heads are concatenated and transformed to produce the final output.",
        },
      ],
    },
    {
      title: "2 موضوع",

      subtitles: [
        {
          title:
            "QuestionsApp QuestionsApp QuestionsApp QuestionsAppQuestionsApp",
          desc: "In practice, transformers use multi-head attention, meaning that the attention mechanism is run multiple times in parallel with different weight matrices. This allows the model to learn different types of relationships between words simultaneously. The results from all the heads are concatenated and transformed to produce the final output.",
        },
        {
          title:
            "QuestionsApp QuestionsApp QuestionsApp QuestionsAppQuestionsApp",
          desc: "In practice, transformers use multi-head attention, meaning that the attention mechanism is run multiple times in parallel with different weight matrices. This allows the model to learn different types of relationships between words simultaneously. The results from all the heads are concatenated and transformed to produce the final output.",
        },
      ],
    },
  ];
  return (
    <Grid container>
      {list.map((items) => (
        <Grid container gap={2} justifyContent={"flex-end"}>
          <Typography>{items.title}</Typography>
          {items.subtitles.map((item) => (
            <Grid container gap={2} justifyContent={"flex-end"}>
              <Typography
                sx={{
                  border: "1px solid",
                  padding: "16px",
                  borderColor: "silver",
                  borderRadius: "12px",
                }}
              >
                {item.title}
              </Typography>
              <Typography textAlign={"end"}>{item.desc}</Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};
