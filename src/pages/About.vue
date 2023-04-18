<template>
  <div class="about">
    <div>
      <h1>
        <i class="fa-solid fa-bahai"></i> Welcome to What's 4 Dinner
        <i class="fa-solid fa-bahai"></i>
      </h1>
      <hr />
      <p>
        At <b>What's 4 Dinner</b>, we make cooking <b>easy and fun</b> for everyone. Our website
        leverages the power of <b>OpenAI API</b> to generate <b>personalized recipes</b> based on
        your inputs. Whether you're looking for something <b>quick and easy</b>, or you want to try
        out something <b>new and exciting</b>, our <b>AI-generated recipes</b> will provide you with
        the <b>inspiration</b> you need.
      </p>
    </div>
    <div>
      <h2><i class="fa-solid fa-star"></i> Who is it for?</h2>
      <hr />
      <p>
        <b>Anyone</b> who wants to cook can benefit from our website. From experienced home cooks to
        <b>beginners</b> who are just starting out, our recipes are designed to be easy to follow
        and <b>fun</b>
        to make. With a wide range of recipe categories and options to choose from, you're sure to
        find something that suits your taste.
      </p>
    </div>
    <div>
      <h2><i class="fa-solid fa-person-circle-question"></i> What can you expect?</h2>
      <hr />
      <p>
        Our AI-generated recipes are packed with <b>flavor</b> and <b>nutrition</b>. Each recipe
        includes a list of <b>ingredients</b>, <b>step-by-step instructions</b>, and even suggested
        <b>cooking times</b>. Whether you're cooking for yourself or for a group of friends, our
        recipes will help you create <b>delicious</b>
        meals that everyone will enjoy.
      </p>
    </div>
    <div>
      <h2><i class="fa-solid fa-backward-fast"></i> How did this get started?</h2>
      <hr />
      <p>
        The idea for What's 4 Dinner came about from our increasing use of <b>ChatGPT</b>. we
        realized that there was an opportunity to use AI to help people cook better, and we set out
        to create a website that would make it easy for <b>anyone</b> to access personalized recipes
        from anywhere.
      </p>
    </div>
    <div>
      <h2><i class="fa-regular fa-circle-check"></i> Our Promise</h2>
      <hr />
      <p>
        At What's 4 Dinner, we're committed to providing you with the
        <b>best possible experience</b>. Our recipes are constantly <b>updated and refined</b> to
        ensure that they're <b>easy to follow, delicious, and nutritious</b>. we believe that
        everyone should have access to <b>healthy and tasty food</b>, and we am dedicated to
        <b>helping you achieve that goal</b>.
      </p>
      <p>
        Thank you for <b>visiting our website</b>, and we hope that you enjoy
        <b>using it as much as we do</b>!
      </p>
    </div>
    <div class="team">
      <h2>Team • <i>Just Me!</i></h2>
      <hr />
      <div class="content">
        <div class="circle-portrait">
          <img src="/me.jpeg" alt="Portrait" />
        </div>
        <p>
          Hi there! My name is <b>Donray Williams</b> and I am excited to share my passion for
          cooking with you. I remember living by myself for the first time and not having a clue
          about how to cook. It was a daunting task, but I persevered and taught myself how to make
          some delicious meals. Since then, I have enjoyed experimenting with different recipes and
          <b>randomizing</b> my ingredients to keep things interesting. My love for cooking was
          further fuelled by my discovery of <b>Chat GPT</b>. As an AI language model, Chat GPT has
          helped me explore new and exciting recipes. It's amazing to see how technology can be used
          to enhance our daily lives, including in the kitchen. I hope my love for cooking and my
          experiences inspire you to experiment in the kitchen as well.
        </p>
      </div>
    </div>
    <div class="content-form">
      <h2>Feedback</h2>
      <hr />
      <p>
        If you have <b>any</b> questions or comments, please feel free to reach out to me at
        <a href="mailto:donrayxwilliams@gmail.com">donrayxwilliams@gmail.com</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-md);
  padding: var(--space-md);
  max-width: 1200px;
  margin: 0 auto;

  i {
    color: var(--color-accent);
  }

  .team {
    .content {
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      .circle-portrait {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
      }

      .circle-portrait img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>

<!-- Drop each section in on page load -->
