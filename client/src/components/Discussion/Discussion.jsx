import axios from 'axios'
import './Discussion.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const Discussion = () => {
  const [dis, setDis] = useState([]);
  useEffect(() => {
    const fetchh = async () => {
      const res = await axios.post("/review/getdisc");
      setDis(res.data);
    };
    fetchh();
  }, []);

  const [topic, setTopic] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "/review/add",
      { topic },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleReplyChange = (e, id) => {
    setReplyInputs((prevInputs) => ({
      ...prevInputs,
      [id]: e.target.value,
    }));
  };

  const handleReply = async (e, id) => {
    e.preventDefault();
    await axios.post(
      `/review/addReply/${id}`,
      { rep: replyInputs[id] },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };


	const [open,setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(!open)
	}

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <LeftNav />
      </div>

      <div className="discussion">
        <div>
					<Button onClick={handleOpen}>Add a Discussion</Button>

					<Dialog open={open} onClose={handleOpen}>
						<DialogActions>
							<button onClick={handleOpen}>X</button>
						</DialogActions>
						<DialogTitle>
							Add a Discussion
						</DialogTitle>
						<DialogContent>
          <form onSubmit={handleSubmit} className='ask'>
            <input
              value={topic}
              type="text"
              placeholder="Topic"
              onChange={(e) => setTopic(e.target.value)}
            />
            <button>Submit</button>
          </form>

						</DialogContent>
					</Dialog>
        </div>

        <div>
          {dis &&
            dis.map((item) => (
              <div className="Disc" key={item._id}>
                <h4 className="D-topic">{item.topic}</h4>

                <form onSubmit={(e) => handleReply(e, item._id)}>
                  <input
                    value={replyInputs[item._id] || ""}
                    type="text"
                    placeholder="Add reply"
                    onChange={(e) => handleReplyChange(e, item._id)}
                  />
                  <button>Submit</button>
                </form>

                {item.reply.map((replyItem) => (
                  <p className="D-reply" key={replyItem._id}>
                    user: {replyItem.rep}
                  </p>
                ))}
                {item.reply.length === 0 ? "No Reply" : ""}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
