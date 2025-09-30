import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const creations =
      await sql`SELECT * FROM creations 
                WHERE user_id = ${userId} 
                ORDER BY created_at DESC 
                LIMIT ${limit} OFFSET ${offset}`;

    const [{ count }] =
      await sql`SELECT COUNT(*)::int as count 
                FROM creations 
                WHERE user_id = ${userId}`;

    res.json({
      success: true,
      creations,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const getPublishedCreations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    const creations = await sql`SELECT * FROM creations 
                WHERE publish = true 
                ORDER BY created_at DESC 
                LIMIT ${limit} OFFSET ${offset}`;

    const [{ count }] =
      await sql`SELECT COUNT(*)::int as count FROM creations WHERE publish = true`;

    res.json({
      success: true,
      creations,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const checkPremiumStatus = async (req, res) => {
  try {
    res.json({
      success: true,
      isPremium: req.plan === "premium",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error checking premium status",
    });
  }
};

export const toggleLikeCreation = async (req,res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if(!creation) {
        return res.json({ success: false, message: 'Creation not found.'});
    }

    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
        updatedLikes = currentLikes.filter((user) => user !== userIdStr);
        message = "Creation Unliked";
    } else {
        updatedLikes = [...currentLikes, userIdStr];
        message = "Creation Liked";
    }

    const formattedArray = `{${updatedLikes.join(',')}}`;

    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    res.json({ success: true, message });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

