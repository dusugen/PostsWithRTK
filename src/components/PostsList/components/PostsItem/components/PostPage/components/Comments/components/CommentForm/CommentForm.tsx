import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { addComment } from "../../../../../../../../../../redux/slices/commentSlice";
import { useThunkDispatch } from "../../../../../../../../../../redux/store";
import { StatusOfRequestEnum } from "../../../../../../../../../../types/enums/statusOfRequestEnum";

interface FormProps {
  id: number | undefined;
  idDisabled: boolean;
  status: StatusOfRequestEnum;
  error: string | null;
}

interface Form {
  name: string;
  email: string;
  body: string;
}

const CommentForm: React.FC<FormProps> = ({
  id,
  idDisabled,
  status,
  error,
}) => {
  const dispatch = useThunkDispatch();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({
    mode: "onBlur",
  });

  const onFormSubmit: SubmitHandler<Form> = (data) => {
    if (id) dispatch(addComment({ comment: data, postId: id }));
  };

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
        disabled={idDisabled}
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
        disabled={idDisabled}
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
        disabled={idDisabled}
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
      <LoadingButton
        type="submit"
        size="large"
        loadingPosition="end"
        endIcon={<SendIcon />}
        variant="contained"
        loading={status === StatusOfRequestEnum.LOADING}
        sx={{ mr: "40px" }}
      >
        <span>Send</span>
      </LoadingButton>
    </Box>
  );
};

export default CommentForm;
