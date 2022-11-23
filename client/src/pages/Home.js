import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image } from "semantic-ui-react";
import PostCard from "../components/PostCard";
const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading </p>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
              {/* <Image src="https://}react.semantic-ui.com/images/wireframe/media-paragraph.png" /> */}
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      commentCount
      likeCount
      likes {
        id
      }
      comments {
        username
      }
    }
  }
  # {
  #   getPosts {
  #     id
  #     body
  #     likeCount
  #     commentCount
  #   }
  # }
`;

export default Home;
