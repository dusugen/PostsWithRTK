import { Box, Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { addComment } from "../../../../../../../../../../redux/slices/commentSlice";
import { useThunkDispatch } from "../../../../../../../../../../redux/store";
import { useEffect } from "react";

interface FormProps {
  id: number | undefined;
}

interface Form {
  name: string;
  email: string;
  body: string;
}

const CommentForm: React.FC<FormProps> = ({ id }) => {
  const dispatch = useThunkDispatch();

  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<Form>({
    mode: "onBlur",
  });

  const onFormSubmit: SubmitHandler<Form> = (data) => {
    if (id) dispatch(addComment({ comment: data, postId: id }));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Typography variant="h5" mb="20px">
        Add your comment
      </Typography>
      <TextField
        error={!!errors?.email}
        helperText={errors.email?.message}
        label="Email"
        variant="outlined"
        sx={{ width: "100%", mb: "20px" }}
        {...register("email", {
          required: "Enter your email",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Enter correct email",
          },
        })}
      />
      <TextField
        error={!!errors?.name}
        helperText={errors.name?.message}
        label="Name"
        sx={{ width: "100%", mb: "20px" }}
        {...register("name", {
          required: "Enter your name",
          minLength: {
            value: 2,
            message: "Min length 2 symbols",
          },
        })}
      />
      <TextField
        error={!!errors?.body}
        helperText={errors.body?.message}
        id="textarea"
        label="Text"
        placeholder="Write your comment"
        multiline
        minRows={4}
        sx={{ width: "100%", mb: "20px" }}
        {...register("body", {
          required: "Comment can't be empty !",
          maxLength: {
            value: 500,
            message: "Max length 500 symbols",
          },
        })}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="success"
        sx={{ alignSelf: "flex-end" }}
      >
        Add comment
      </Button>
    </Box>
  );
};

export default CommentForm;
