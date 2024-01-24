FROM denoland/deno

WORKDIR /ust/app

COPY ./ ./

RUN deno

CMD ["deno", "task",  "dev"]
