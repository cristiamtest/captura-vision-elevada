# Project rules
- Portfolio media is managed in the backend (`media_items` table + private `media` bucket served via signed URLs) because the workspace blocks public buckets.
- Admin access is checked via the `user_roles` table and `has_role()`; never via client storage.
- Admin usernames map to `<username>@2818studios.com` login emails so staff can sign in with a plain username.
- Legacy Firebase Storage images are merged after backend media on the Portfolio page so old content keeps showing.
