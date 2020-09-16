"""switch int to string ID

Revision ID: 48f9f42664bb
Revises: c4c47b0b3690
Create Date: 2020-09-15 22:05:09.326774

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '48f9f42664bb'
down_revision = 'c4c47b0b3690'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('sale_items', 'id', existing_type=sa.INTEGER(),
               type_=sa.VARCHAR(),
               nullable=False)
    # op.create_primary_key('pk_sale_items', 'sale_items', ['id'])


def downgrade():
    op.alter_column('sale_items', 'id',
               existing_type=sa.VARCHAR(),
               type_=sa.INTEGER(),
               nullable=False)
    # op.create_primary_key('pk_sale_items', 'sale_items', ['id'])
