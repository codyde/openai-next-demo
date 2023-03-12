## OpenAI and NextJS 13 Demo 

This is a real simple demo of calling the OpenAI API and returning the data to a window. No streaming in this example - just an `await` for the return of a promise, not unlike my own life. This app uses NextJS 13 and the [new `app` directory](https://nextjs.org/blog/next-13#new-app-directory-beta) routing, alongside [TailwindCSS](https://tailwindcss.com/) and some [shadcn/ui](https://ui.shadcn.com/). 

Purpose of this was to give a starter for some easy future exploration on topics. 

### Running it 

You'll need an OpenAI API key which you can get from your account details there. Once you have this... 

Create an .env file in the root directory of your system (or use secrets from any of the great providers out there - Netlify, Vercel, Railway). If running local, run `npm run dev` and you should be off to the races! 

### Areas I'm exploring next... 

* Implement API streaming ([plenty of examples out there](https://github.com/Nutlope/twitterbio/blob/main/utils/OpenAIStream.ts); I just want to make sure I understand them fully first)
* Playing with creating a history of calls stored in [Supabase](https://www.supabase.com)