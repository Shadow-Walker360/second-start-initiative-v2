/**
 * Admin Authorization Middleware
 * ------------------------------
 * Ensures the authenticated user has admin privileges.
 */

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Admin access required',
    });
  }

  next();
};
    const donation = await Donation.find
        .findByIdAndUpdate(payment.donation, {
        status: 'completed',
        completedAt: new Date(),
      });
    res.status(200).end();