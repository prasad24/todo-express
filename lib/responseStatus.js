export const sendError = (res, message, status=400) => {
    console.log('Message', message);
    return res.status(status).json({
        error: true,
        message
    });
}