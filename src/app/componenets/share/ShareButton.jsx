"use client";

function ShareButton({ id }) {
  const url = `https://lwskart-mu.vercel.app/en/product/${id}`;
  const title = "My Page Title";

  const shareOnSocialMedia = (socialMedia) => {
    let shareUrl = "";
    switch (socialMedia) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          title + " " + url
        )}`;
        break;
      // Add cases for other social media platforms
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      <button
        onClick={() => shareOnSocialMedia("facebook")}
        className="inline-flex bg-zinc-500 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-transparent hover:border-primary hover:text-primary transition text-white bg-facebook hover:bg-facebook-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.13 6.25H13.5c-.41 0-.75.34-.75.75v2.26h1.25c-.05.63-.23 1.29-.51 1.92h-.74v6.28h-2.28v-6.28h-1.36v-1.87h1.36v-1c0-1.42.82-2.47 2.05-2.47h1.46V8.5h-.01l.01-.01c0-.05-.04-.1-.1-.1z" />
        </svg>
        Facebook
      </button>
      <button
        onClick={() => shareOnSocialMedia("twitter")}
        className="inline-flex bg-zinc-500 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-transparent hover:text-primary transition hover:border-primary bg-twitter hover:bg-twitter-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.92 4.58c-.88.38-1.83.63-2.83.75 1.01-.61 1.78-1.57 2.15-2.72-.95.56-2 1-3.12 1.22-.9-.96-2.18-1.56-3.6-1.56-2.72 0-4.92 2.2-4.92 4.92 0 .39.04.78.13 1.15-4.09-.21-7.72-2.16-10.15-5.15-.42.72-.66 1.56-.66 2.46 0 1.7.86 3.2 2.16 4.08-.8-.03-1.55-.25-2.2-.62v.06c0 2.37 1.69 4.34 3.93 4.78-.41.12-.85.18-1.3.18-.32 0-.63-.03-.94-.09.64 2.05 2.5 3.54 4.7 3.58-1.72 1.35-3.86 2.15-6.19 2.15-.4 0-.79-.02-1.18-.07 2.21 1.45 4.83 2.3 7.64 2.3 9.16 0 14.17-7.59 14.17-14.16 0-.21 0-.42-.02-.63.97-.7 1.81-1.58 2.47-2.58z" />
        </svg>
        Twitter
      </button>
      <button
        onClick={() => shareOnSocialMedia("linkedin")}
        className="inline-flex bg-zinc-500 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-transparent hover:text-primary transition hover:border-primary bg-linkedin hover:bg-linkedin-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.6v-5.6c0-1.33-.47-2.24-1.65-2.24-.9 0-1.43.61-1.67 1.21-.09.23-.11.56-.11.89v5.74h-3.6s.05-9.32 0-10.29h3.6v1.46c-.01.01-.02.03-.03.04h.03v-.04c.48-.74 1.34-1.8 3.27-1.8 2.38 0 4.17 1.55 4.17 4.87v5.76zM7.39 8.64c-1.23 0-2.02-.83-2.02-1.87 0-1.06.82-1.87 2.07-1.87 1.25 0 2.02.81 2.03 1.87 0 1.04-.79 1.87-2.08 1.87zM5.49 20.45h3.6V10.16h-3.6v10.29zM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44C23.2 24 24 23.2 24 22.22V1.78C24 .8 23.2 0 22.22 0z" />
        </svg>
        LinkedIn
      </button>
      <button
        onClick={() => shareOnSocialMedia("whatsapp")}
        className="inline-flex bg-zinc-500 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-transparent hover:text-primary transition hover:border-primary bg-whatsapp hover:bg-whatsapp-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2.03c-5.52 0-9.98 4.46-9.98 9.98 0 1.76.46 3.44 1.33 4.93l-1.39 5.08 5.16-1.36c1.47.81 3.13 1.24 4.89 1.24 5.52 0 9.98-4.46 9.98-9.98s-4.46-9.99-9.99-9.99zm5.75 14.86c-.24.66-1.34 1.3-1.85 1.37-.47.07-1.08.1-1.74-.11-.4-.12-.9-.28-1.55-.55-2.74-1.14-4.53-3.83-4.67-4.01-.14-.18-1.11-1.47-1.11-2.81s.7-1.98.94-2.26c.25-.29.55-.36.74-.36.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.6.84 2.08.92 2.22.07.14.11.3.02.48-.1.18-.15.3-.3.46-.14.16-.29.36-.42.47-.14.11-.29.23-.12.45.17.23.76 1.24 1.64 2.01 1.13 1.01 2.09 1.33 2.32 1.47.23.14.36.12.5-.07.15-.18.57-.66.73-.89.18-.22.35-.18.58-.11.24.07 1.5.71 1.76.84.26.14.43.18.5.28.06.12.06.69-.18 1.35z" />
        </svg>
        WhatsApp
      </button>
    </>
  );
}

export default ShareButton;
