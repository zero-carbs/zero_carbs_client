export const questions = [
  {
    question: "Can I add multiple of the same item?",
    answer: (
      <>
        <p>
          You can really do whatever you want because there is no rule against
          multiple items with the same name. But be aware that it can get
          confusing when creating a listing becuase you might not be sure
          exactly which items you are selecting if they all have the same name.
          For situations like this I like to add a unique identifier to each
          item like a serial number.
        </p>
        <p>
          In a future release I would like to add a 'quantity' field to each
          item, but for now I suggest the unique identifier route.
        </p>
      </>
    ),
  },
  {
    question: "Should I make a new Purchase for every item I buy?",
    answer: (
      <>
        <p>
          It&apos;s really up to you. 99% of the time I like to add all my items
          in the purchase they were made, but there are some exceptions where I
          will "break out" an item from it&apos;s purchase. One reason you might
          want to do this is so you can track the progress of each item and have
          the sales data be more specific and on a "per-item" basis.
        </p>
      </>
    ),
  },
  {
    question: "Can I export my data for tax purposes?",
    answer: (
      <>
        <p>
          There is an 'export' option on the Settings page where you can export
          all your Purchases, Listings and Items and save them in JSON format
          which can get you part of the way there, but there&apos;s no 1:1 from
          zero_carbs to any finance software at this point.
        </p>
      </>
    ),
  },
  {
    question: "Is there a mobile app?",
    answer: (
      <>
        <p>Kind of...</p>
        <p>
          zero_carbs is basically all set up to be run on iOS and Android
          devices, but it&apos;s not in the app stores yet. This should be all
          set up very soon and I&apos;ll be sure to add a notification to let
          you know when it happens.
        </p>
        <p>
          If you have a moderate understand of app development you can clone the
          repo, build it locally and sideload it with Android Studio/XCode.
        </p>
      </>
    ),
  },
];
